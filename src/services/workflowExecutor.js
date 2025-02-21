import { SendMessageCommand } from '@aws-sdk/client-sqs';
import sqsClient from '../config/sqs.js';

export async function queueWorkflowExecution(workflow) {
  try {
    const command = new SendMessageCommand({
      QueueUrl: process.env.AWS_SQS_QUEUE_URL,
      MessageBody: JSON.stringify({
        workflowId: workflow._id.toString(),
        nodes: workflow.nodes,
        edges: workflow.edges,
        version: workflow.version,
        timestamp: new Date().toISOString()
      }),
      MessageAttributes: {
        'WorkflowId': {
          DataType: 'String',
          StringValue: workflow._id.toString()
        },
        'Version': {
          DataType: 'Number',
          StringValue: workflow.version?.toString() || '1'
        }
      }
    });

    const response = await sqsClient.send(command);
    return response.MessageId;
  } catch (error) {
    console.error('Error queuing workflow execution:', error);
    throw error;
  }
}