import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CHANGE_VOTE, DELETE_CARD } from "./utils/mutations";

export default function Card({ card: { cardInfo }, card: { boardId }, card: { columnId } }) {
  const votedBool = cardInfo.voterArray.includes("Test Name 5");

  const [changeVote, { changeVoteError }] = useMutation(CHANGE_VOTE);
  const saveChangeVote = () => {
    try {
      const { data } = changeVote({
        variables: {
          boardId,
          cardId: cardInfo._id,
          votedBool,
          voterName: "Test Name 5",
        },
      });
    } catch (incVoteError) {
      console.error("Unable to change vote");
    }
  };

  const [delCard, {deleteCardError}] = useMutation(DELETE_CARD)
  const saveDeleteCard = () => {
    try{
        const {data} = delCard({
            variables: {
                boardId,
                columnId,
                cardId: cardInfo._id
            }
        })

    }catch(deleteCardError){
        console.error("Unable to delete card", deleteCardError)
    }

  }

  console.log(cardInfo)


  return (
    <div>
      <p>
        {cardInfo.content} by {cardInfo.author} Votes: {cardInfo.voteCount}
      </p>
      {votedBool ? (
        <button onClick={saveChangeVote}>UnVote</button>
      ) : (
        <button onClick={saveChangeVote}>Vote</button>
      )}
      <button onClick={saveDeleteCard}>Delete Card</button>
    </div>
  );
}
