import express from 'express';
import { getProverbs, saveProverbs } from '../utils/fileHelpers.js';

const router = express.Router();

export default (upload) => {

  router.get('/proverbs', (req, res) => {
    const proverbs = getProverbs();
    res.json(proverbs);
  });

  // RANDOM route — place it BEFORE /:id
  router.get('/proverbs/random', (req, res) => {
    const proverbs = getProverbs();
    const proverbIndex = Math.floor(Math.random() * proverbs.length);
    const randomProverb = proverbs[proverbIndex];
    res.json(randomProverb);
  });

  router.get('/proverbs/:id', (req, res) => {
    const proverbs = getProverbs();
    const id = parseInt(req.params.id);

    const Pverb = proverbs.find(p => p.id === id);
    if (!Pverb) {
      return res.status(404).json({ message: "Proverb not found" });
    }
    res.json(Pverb);
  });

  router.post('/proverbs', (req, res) => {
    const proverbs = getProverbs();
    const newId = proverbs.length > 0 ? Math.max(...proverbs.map(p => p.id)) + 1 : 1;

    const { textDari, textPashto, translationEn, meaning, category } = req.body;

    const newProverb = {
      id: newId,
      textDari,
      textPashto,
      translationEn,
      meaning,
      category
    };

    proverbs.push(newProverb);
    saveProverbs(proverbs);
    res.status(201).json({ message: "Proverb was added", newProverb });
  });

  router.put('/proverbs/:id', (req, res) => {
    const proverbs = getProverbs();
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 1) {
      return res.status(400).json({ message: "The ID should be greater than 0" });
    }

    const index = proverbs.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "The proverb is not found" });
    }

    const updatedProverb = { ...proverbs[index], ...req.body, id };
    proverbs[index] = updatedProverb;
    saveProverbs(proverbs);
    res.json({ message: "Proverb is updated", updatedProverb });
  });

  router.delete('/proverbs/:id', (req, res) => {
    const proverbs = getProverbs();
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 1) {
      return res.status(400).json({ message: "The ID should be greater than 0" });
    }

    const index = proverbs.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Proverb not found for deletion" });
    }

    proverbs.splice(index, 1);
    saveProverbs(proverbs);
    res.json({ message: "Proverb deleted!" });
  });

  return router;
};
