import axios from "axios";
import { CreateCardPayload } from "../interfaces/CreateCardPayload";

const API: string = import.meta.env.VITE_CARDS_API;

// get all cards
export function getAllCards() {
  return axios.get(API);
}

// post new card
export function postNewCard(payload: CreateCardPayload) {
  return axios.post(API, payload, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
}

// delete card by id
export function deleteCard(cardId: string) {
  return axios.delete(`${API}/${cardId}`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
}

// update card
export function updateCard(id: string, payload: CreateCardPayload) {
  return axios.put(`${API}/${id}`, payload, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
}


// get card by id
export function getCardById(id: string) {
  return axios.get(`${API}/${id}`);
}

// favorite cards
export function toggleFavorite(cardId: string) {
  return axios.patch(`${API}/${cardId}`, null, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
}
