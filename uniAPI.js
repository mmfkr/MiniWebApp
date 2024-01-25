const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer(); // for parsing multipart/form-data
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('uniDB.db');
const path = require('path');
const clientPath = path.join(__dirname, 'Client');
app.use(express.static(clientPath));
app.use(express.json()); 
const multerMiddleware = multer();

/**
 * @api {post} /university Create a new University
 * @apiName AddUniversity
 * @apiGroup University
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name University's name.
 * @apiParam {String} department University's department.
 * @apiParam {String} location University's location.
 * @apiParam {Number} ranking University's ranking.
 *
 * @apiSuccess {String} message Success message.
 */
app.post('/university', multerMiddleware.none(), (req, res) => {
    const { name, department, location, ranking } = req.body;
    db.run('INSERT INTO university (name, department, location, ranking) VALUES (?, ?, ?, ?)', 
           [name, department, location, ranking], 
           function(err) {
               if (err) {
                   res.status(500).json({ error: err.message });
                   return;
               }
               res.json({ message: 'New university added successfully', id: this.lastID });
           });
});


/**
 * @api {get} /university Request All Universities
 * @apiName GetAllUniversities
 * @apiGroup University
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object[]} data List of universities.
 */
// Read all
app.get('/university', (req, res) => {
    db.all('SELECT * FROM university', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});


/**
 * @api {get} /university/:id Request University by ID
 * @apiName GetUniversityById
 * @apiGroup University
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id University's unique ID.
 *
 * @apiSuccess {Object} university University details.
 */
// Read one by ID
app.get('/university/:id', (req, res) => {
    db.get('SELECT * FROM university WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ message: 'University not found' });
        }
    });
});

/**
 * @api {get} /university/department/:department Request Universities by Department
 * @apiName GetUniversitiesByDepartment
 * @apiGroup University
 * @apiVersion 1.0.0
 *
 * @apiParam {String} department Department name.
 *
 * @apiSuccess {Object[]} universities List of universities in the specified department.
 */
// Get Universities by Department
app.get('/university/department/:department', (req, res) => {
    const department = req.params.department;
    db.all('SELECT * FROM university WHERE department = ?', [department], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

/**
 * @api {get} /university/top/:limit Request Top Ranked Universities
 * @apiName GetTopRankedUniversities
 * @apiGroup University
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} limit Limit of universities to retrieve.
 *
 * @apiSuccess {Object[]} universities List of top ranked universities.
 */
// Get Top Ranked Universities
app.get('/university/top/:limit', (req, res) => {
    const limit = req.params.limit;
    db.all('SELECT * FROM university ORDER BY ranking ASC LIMIT ?', [limit], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

/**
 * @api {put} /university/:id Update a University
 * @apiName UpdateUniversity
 * @apiGroup University
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id University's unique ID.
 * @apiParam {String} name University's name.
 * @apiParam {String} department University's department.
 * @apiParam {String} location University's location.
 * @apiParam {Number} ranking University's ranking.
 *
 * @apiSuccess {String} message Success message.
 */
// Update (with form data using multer)
app.put('/university/:id', upload.none(), (req, res) => {
    const { name, department, location, ranking } = req.body;
    console.log("PUT request data:", req.body); // Log request data

    db.run('UPDATE university SET name = ?, department = ?, location = ?, ranking = ? WHERE id = ?', [name, department, location, ranking, req.params.id], function(err) {
        if (err) {
            console.error("Error in PUT /university:", err.message); // Log any errors
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'University updated successfully', changes: this.changes });
    });
});

/**
 * @api {delete} /university/:id Delete a University
 * @apiName DeleteUniversity
 * @apiGroup University
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id University's unique ID.
 *
 * @apiSuccess {String} message Success message.
 */
// Delete
app.delete('/university/:id', (req, res) => {
    db.run('DELETE FROM university WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'University deleted successfully', changes: this.changes });
    });
});

if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(3000, () => {
      console.log(`Server running on port 3000`);
    });
  }
  
  
module.exports = app; // Export the app instance
