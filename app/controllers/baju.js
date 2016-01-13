'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
var Baju = mongoose.model('Baju');

router.get('/', function (req, res) {
    Baju.find({}).exec(function(err, baju) {
        console.log(baju);
        res.render('baju_index', { data : baju });
    });
});

// Tambah data
router.get('/tambah', function (req, res) {
    res.render('baju_tambah', { title: 'Tambah Baju', data: '' });
});

router.post('/tambah', function (req, res) {
    console.log(req.body);
    var merek = req.body.merek;
    var ukuran = req.body.ukuran;
    var warna = req.body.warna;

    var BajuBaru = new Baju({ merek: merek, ukuran: ukuran, warna: warna });
    BajuBaru.save(function(err) {
        if (err) throw err;
        res.redirect('/baju');
    });
});

// Ubah data
router.get('/ubah/:baju_id([0-9a-z]+)', function(req, res) {
    Baju.findOne({ _id: req.params.baju_id }).exec(function(err, baju) {
        if (err) throw err;
        res.render('baju_tambah', { title: 'Ubah Baju', data: baju });
    });
});

router.post('/ubah/:baju_id([0-9a-z]+)', function(req, res) {
    var data_terubah = req.body;
    Baju.findOneAndUpdate({ _id: req.params.baju_id }, data_terubah).exec(function(err) {
        if (err) throw err;
        res.redirect('/baju');
    });
});

// Hapus data
router.get('/hapus/:baju_id([0-9a-z]+)', function(req, res) {
    Baju.findOneAndRemove({ _id: req.params.baju_id }).exec(function(err) {
        if (err) throw err;
        res.redirect('/baju');
    });
});

module.exports = router;
