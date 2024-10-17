// server.js
const express = require('express');
const Web3 = require('web3');
const bodyParser = require('body-parser');
const contractABI = require('./contractABI.json'); // ABI généré par Truffle
const contractAddress = '0xCf8c5CC2eb2FAC7A3279140F0B70855a7E07536b'; // Adresse du contrat déployé
const app = express();

app.use(bodyParser.json());

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // Ganache ou autre réseau blockchain
const voteContract = new web3.eth.Contract(contractABI, contractAddress);

// Inscription d'un utilisateur
app.post('/register', (req, res) => {
  // Inscription à MongoDB ici
  res.send('Inscription réussie');
});

// Connexion d'un utilisateur
app.post('/login', (req, res) => {
  // Connexion logique ici
  res.send('Connexion réussie');
});

// Soumission du vote
app.post('/vote', async (req, res) => {
  const { address } = req.body;

  try {
    await voteContract.methods.submitVote().send({ from: address });
    res.send('Vote soumis pour groupe6 avec succès');
  } catch (error) {
    if (error.message.includes("Vous avez déjà voté.")) {
      res.status(400).send('Erreur : Vous avez déjà voté.');
    } else {
      res.status(500).send('Erreur lors de la soumission du vote');
    }
  }
});

// Vérification de la liste des votants
app.get('/votes', async (req, res) => {
  try {
    const votes = await voteContract.methods.getVotes().call();
    res.json(votes);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des votes');
  }
});

app.listen(3001, () => {
  console.log('Backend running on port 3001');
});
