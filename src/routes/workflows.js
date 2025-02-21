import { Router } from 'express';
import { ObjectId } from '../config/database.js';
import { getDb } from '../config/database.js';
import { validateWorkflow } from '../validators/workflowValidator.js';
import { queueWorkflowExecution } from '../services/workflowExecutor.js';

const router = Router();

// Get all workflows
router.get('/', async (req, res, next) => {
  try {
    const db = getDb();
    const workflows = await db.collection('workflows')
      .find()
      .sort({ modifiedAt: -1 })
      .toArray();

    res.json(workflows);
  } catch (error) {
    next(error);
  }
});

// Get a specific workflow
router.get('/:id', async (req, res, next) => {
  try {
    const db = getDb();
    const workflow = await db.collection('workflows').findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    res.json(workflow);
  } catch (error) {
    next(error);
  }
});

// Execute a workflow
router.post('/:id/execute', async (req, res, next) => {
  try {
    const db = getDb();
    const workflow = await db.collection('workflows').findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    // Queue the workflow execution
    const messageId = await queueWorkflowExecution(workflow);

    res.json({
      success: true,
      message: 'Workflow execution queued successfully',
      executionId: messageId,
      workflow: {
        id: workflow._id,
        version: workflow.version
      }
    });
  } catch (error) {
    next(error);
  }
});

// Save a workflow
router.post('/', async (req, res, next) => {
  try {
    const workflow = req.body;
    
    // Validate workflow data
    const validation = validateWorkflow(workflow);
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'Invalid workflow data',
        details: validation.error 
      });
    }

    const db = getDb();
    const now = new Date().toISOString();
    
    if (workflow._id) {
      // Update existing workflow
      const result = await db.collection('workflows').updateOne(
        { _id: new ObjectId(workflow._id) },
        { 
          $set: {
            ...workflow,
            modifiedAt: now,
            version: (workflow.version || 0) + 1
          }
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Workflow not found' });
      }

      const baseUrl = `${req.protocol}://${req.get('host')}`;
      res.json({ 
        success: true,
        id: workflow._id,
        message: 'Workflow updated successfully',
        executeUrl: `${baseUrl}/workflows/${workflow._id}/execute`
      });
    } else {
      // Create new workflow
      const workflowToSave = {
        ...workflow,
        createdAt: now,
        modifiedAt: now,
        version: 1
      };

      const result = await db.collection('workflows').insertOne(workflowToSave);
      const baseUrl = `${req.protocol}://${req.get('host')}`;

      res.json({ 
        success: true,
        id: result.insertedId,
        workflow: workflowToSave,
        message: 'Workflow created successfully',
        executeUrl: `${baseUrl}/workflows/${result.insertedId}/execute`
      });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a workflow
router.delete('/:id', async (req, res, next) => {
  try {
    const db = getDb();
    const result = await db.collection('workflows').deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    res.json({ 
      success: true,
      message: 'Workflow deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;