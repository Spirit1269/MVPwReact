import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import { check, validationResult } from 'express-validator';

const { Pool } = pg;

const app = express();
app.use(express.static("public"));  //<-- right after `app` is created and before routes

dotenv.config();  //<-- has to be before 'process.env' is called
const port = process.env.PORT || 3000;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5 //<--max num of connections, change as needed
});

app.use(express.json());  //<--has to be before routes

app.get("/", (req, res) => {   
    res.send("Hello world!");
});

//Get all persons
app.get('/api/person', (req, res) => {
    pool.query(`SELECT * FROM person`, (err, response) => {
        console.log(err ? err : response.rows)
        res.json(response.rows)
    })
})

//Get all Destinations
app.get('/api/destinations', (req, res) => {
    pool.query(`SELECT * FROM destinations`, (err, response) => {
        console.log(err ? err : response.rows)
        res.json(response.rows)
    })
})

//Create a Person
app.post('/api/person',  [
    check('last_name').notEmpty().withMessage('Last Name is required'),
    check('first_name').notEmpty().withMessage('First Name is required'),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return validation errors to the client-side
      return res.status(400).json({ errors: errors.array() });
    }
  
    console.log(req.body)
    pool.query('INSERT INTO person (last_name, first_name, cell_phone, affiliation, position, arrival_date, arrival_time, destination_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * ',
    [
        req.body.last_name,
        req.body.first_name, 
        req.body.cell_phone, 
        req.body.affiliation,
        req.body.position,
        req.body.arrival_date,
        req.body.arrival_time,
        req.body.destination_id
    ])

      .then((result) => {
         // Send relevant response data to client-side
         res.status(201).json({ message: "Person added successfully", yarn: result.rows[0] });
     })
     .catch((error) => {
         // Handle database errors
         console.error(error);
         res.status(500).json({ message: "Internal server error" });
     });
    
     
}); 

//Delete a person
app.delete('/api/person/:id', (req, res) => {
    const id = req.params.id; // Get the id from URL parameter

    pool.query('DELETE FROM person WHERE id = $1 RETURNING *', [id])
    .then((result) => {
        if (result.rowCount === 0) {
            // If no rows were affected, return an error
            res.status(404).json({ message: 'Person not found' });
        } else {
            // Send relevant response data to client-side
            res.json({ message: 'Person deleted successfully', Person: result.rows[0] });
        }
    })
})

//Update a Person
    app.patch('/api/person/:id', (req, res) => {
        const id = req.params.id; // Get the id from URL parameter
        const { last_name, first_name, cell_phone, affiliation, position, arrival_date, arrival_time, destination_id} = req.body; // Get the updated data from request body
    
        // Construct the update query dynamically based on the fields that are present in the request body
        let updateQuery = 'UPDATE person SET ';
        const updateParams = [];
        let paramCount = 1;
    
        // Check if each field is present in the request body, and add it to the update query and parameters array
        if (last_name) {
            updateQuery += `last_name = $${paramCount}, `;
            updateParams.push(last_name);
            paramCount++;
        }
        if (first_name) {
            updateQuery += `first_name = $${paramCount}, `;
            updateParams.push(first_name);
            paramCount++;
        }
        if (cell_phone) {
            updateQuery += `cell_phone = $${paramCount}, `;
            updateParams.push(cell_phone);
            paramCount++;
        }
        if (affiliation) {
            updateQuery += `affiliation = $${paramCount}, `;
            updateParams.push(affiliation);
            paramCount++;
        }
        if (position) {
            updateQuery += `position = $${paramCount}, `;
            updateParams.push(position);
            paramCount++;
        }
        if (arrival_date) {
            updateQuery += `arrival_date = $${paramCount}, `;
            updateParams.push(arrival_date);
            paramCount++;
        }
        if (arrival_time) {
            updateQuery += `arrival_time = $${paramCount}, `;
            updateParams.push(arrival_time);
            paramCount++;
        }
        if (destination_id) {
            updateQuery += `destination_id = $${paramCount}, `;
            updateParams.push(destination_id);
            paramCount++;
        }
    
        updateQuery = updateQuery.slice(0, -2);
    
        // Add the WHERE clause to specify the item to be updated
        updateQuery += ` WHERE id = $${paramCount} RETURNING *`;
        updateParams.push(id);
   
        pool.query(updateQuery, updateParams)
            .then((result) => {
                if (result.rowCount === 0) {
                    // If no rows were affected, return an error
                    res.status(404).json({ message: 'Person not found' });
                } else {
                    // Send relevant response data to client-side
                    res.json({ message: 'Person updated successfully', Person: result.rows[0] });
                }
            })
        
            .catch((error) => {
                // Handle database errors
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
            });
    });



app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server started on port ${port}`);
    }
});
