import express from 'express';
import { item } from '../models/itemsmodel.js'; // Adjust the import path if needed

const router = express.Router();

// Route to create a new item
router.post('/create', async (req, res) => {
  console.log(req.body); // Log the request body to ensure data is being received
  try {
    // Extract data from request body
    const { Name, Description, Price, Image } = req.body;

    // Create a new item instance
    const newItem = new item({
      Name,
      Description,
      Price,
      Image
    });

    // Save the item to the database
    await newItem.save();

    // Send the created item as the response
    res.status(201).send(newItem);
    console.log('New item added successfully');
  } catch (error) {
    // Send the error response
    res.status(400).send({ error: error.message });
    console.error('Error adding new item:', error); // Log the error for debugging
  }

  console.log('Request handled');
});

router.get('/getAll', async (req, res) => {
  try {
    // Fetch all items from the database
    const allItems = await item.find(); 

    // Send the items as the response
    res.status(200).json(allItems);
    console.log("Fetched all items successfully");
  } catch (error) {
    // Handle any errors that occurred during the fetch
    res.status(500).json({ error: error.message });
    console.error("Error fetching items:", error);
  }
});

router.delete('/delete/:ItemId', async (req, res) => {
  console.log('Delete request received for item ID:', req.params.ItemId);

  try {
    // Delete the item by ID
    const itemToDelete = await item.findByIdAndDelete(req.params.ItemId);
    if (!itemToDelete) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Item deleted successfully' });
    console.log('Item deleted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error('Error deleting item:', error);
  }
});

router.put('/:id', async (req, res) => {
  console.log('Update request received for item ID:', req.params.id);

  try {
    const updatedItem = await item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error('Error updating item:', error);
  }
});

export default router;
