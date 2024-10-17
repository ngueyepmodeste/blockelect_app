// contracts/VoteContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteContract {
    struct Vote {
        address voter;
        string candidate;
    }

    mapping(address => bool) public hasVoted; // Pour suivre qui a voté
    Vote[] public votes; // Liste des votes

    event VoteSubmitted(address indexed voter, string candidate);

    // Fonction pour soumettre un vote
    function submitVote() public {
        require(!hasVoted[msg.sender], "Vous avez déjà voté.");

        // Vote pour "groupe6" forcé
        Vote memory newVote = Vote({
            voter: msg.sender,
            candidate: "groupe6"
        });

        votes.push(newVote); // Ajoute le vote à la liste
        hasVoted[msg.sender] = true; // Marque l'adresse comme ayant voté

        emit VoteSubmitted(msg.sender, "groupe6"); // Émet l'événement de vote soumis
    }

    // Fonction pour récupérer tous les votes
    function getVotes() public view returns (Vote[] memory) {
        return votes; // Retourne la liste des votes
    }

    // Vérification si l'adresse a déjà voté
    function checkIfVoted(address voter) public view returns (bool) {
        return hasVoted[voter]; // Retourne true si l'adresse a déjà voté
    }
}
