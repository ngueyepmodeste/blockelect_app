import React, { useState } from 'react';
import Web3 from 'web3';

const VotingApp = () => {
  const [account, setAccount] = useState(null);
  const [message, setMessage] = useState('');
  const [voters, setVoters] = useState([]);

  // Fonction pour connecter MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);  // Stocke l'adresse du portefeuille
        setMessage(`Connecté avec l'adresse : ${accounts[0]}`);
      } catch (error) {
        setMessage('Erreur lors de la connexion à MetaMask');
      }
    } else {
      setMessage('MetaMask non détecté');
    }
  };

  // Fonction pour soumettre un vote
  const submitVote = async () => {
    if (!account) {
      setMessage('Veuillez d\'abord connecter votre portefeuille.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: account }),  // Envoie l'adresse au backend
      });

      if (response.ok) {
        setMessage('Vote soumis avec succès pour groupe6 !');
      } else if (response.status === 400) {
        setMessage('Erreur : Vous avez déjà voté.');
      } else {
        setMessage('Erreur lors de la soumission du vote.');
      }
    } catch (error) {
      setMessage('Erreur lors de la soumission du vote.');
    }
  };

  // Fonction pour récupérer la liste des votants
  const fetchVoters = async () => {
    try {
      const response = await fetch('http://localhost:3001/votes');
      const data = await response.json();
      setVoters(data);
    } catch (error) {
      setMessage('Erreur lors de la récupération des votes.');
    }
  };

  return (
    <div>
      <h1>Application de vote sur Blockchain</h1>
      {!account && (
        <button onClick={connectWallet}>Connecter MetaMask</button>
      )}
      {account && (
        <>
          <p>Adresse connectée : {account}</p>
          <button onClick={submitVote}>Voter pour groupe6</button>
          <button onClick={fetchVoters}>Voir les votants</button>
          <ul>
            {voters.map((voter, index) => (
              <li key={index}>{voter}</li>
            ))}
          </ul>
        </>
      )}
      <p>{message}</p>
    </div>
  );
};

export default VotingApp;
