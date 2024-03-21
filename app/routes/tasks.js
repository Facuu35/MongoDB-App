const express = require(`express`)
const router = express.Router()

const Task = require(`../models/Task`)

/**
 * GET: Returns one task with the task's id specified in the path
 */
router.get(`/:id`, async (req, res) => {
	try {
		const task = await Task.findById(req.params.id)
		if (!task) res.status(404).send(`Task with ID ${req.params.id} does not exist.`)
		else res.status(200).send(task)
	} catch (error) {
		console.error(error)
		res.status(401).send(`Something went wrong.`)
	}
})

// TODO: Write 4 more handlers for create, read, update, and delete.
// The verb after `router.` should match the table in the instructions, Step 7

/**
 * POST: Creates one task with a body containing the text and date
 */
router.post('/', async (req, res) => {
	try {
		// Check if all required fields are provided
		if (!req.body.Text || !req.body.Date) {
			return res.status(500).send('Text and Date are required');
		}

		// Create a new Task object using request.body and request.user
		const newTask = new Task({
			Text: req.body.Text,
			UserId: req.user.Id,
			Done: false,
			Date: req.body.Date
			// Assuming user information is stored in request.user
		});

		// Save the new task using Mongoose
		const savedTask = await newTask.save();

		// Send the saved task back to the client with a 201 status (Created)
		res.status(201).send(savedTask);
	} catch (error) {
		// Log any errors to the console and send a 500 error (Server Error)
		console.error(error);
		res.status(500).send('Server Error');
	}
});

router.get('/', async (req, res) => {
	try {
		// Check if the user is authenticated
		if (!req.user) {
			return res.status(401).send('Unauthorized');
		}

		// Find all tasks for the authenticated user
		const tasks = await Task.find({ UserId: req.user.Id }); // Assuming user information is stored in request.user

		// If no tasks are found, return a 404 error
		if (!tasks || tasks.length === 0) {
			return res.status(404).send('No tasks found');
		}

		// Send the tasks back to the client
		res.send(tasks);
	} catch (error) {
		// Log any errors to the console and send a 500 error (Server Error)
		console.error(error);
		res.status(500).send('Server Error');
	}
});


// Update a task
router.put('/:id', async (req, res) => {
	try {
		// Update the task using Task.findByIdAndUpdate() or Task.findOneAndUpdate()
		const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

		// If updatedTask is null, the task with the specified ID does not exist
		if (!updatedTask) {
			return res.status(404).send('Task not found');
		}

		// Send the updated task back to the client
		res.send(updatedTask);
	} catch (error) {
		// Log any errors to the console and send a 500 error (Server Error)
		console.error(error);
		res.status(500).send('Server Error');
	}
});


router.delete('/:id', async (req, res) => {
	try {
		// Check if the task exists before attempting to delete it
		const task = await Task.findById(req.params.id);
		if (!task) {
			return res.status(404).send('Task not found');
		}

		// Delete the task using Task.findByIdAndDelete()
		await Task.findByIdAndDelete(req.params.id);

		// Send a message back to the client
		res.send('Task deleted successfully');
	} catch (error) {
		// Log the error to the console
		console.error(error);

		// Send a 500 error response with the error message
		res.status(500).send(error.message); // Modify this line to send the error message
	}
});
module.exports = router