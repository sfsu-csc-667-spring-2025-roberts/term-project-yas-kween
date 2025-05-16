import { Request, Response } from "express";

export const discard = async (request: Request, response: Response) => {
  // Validate
  // is it the current users turn
  // does the current user have the selected card id
  // update the selected card id to be in the selected pile
  // reset the user hasdrawn to false
  // reset the user is current false
  // set the next user to is current
  // broadcast game state
};
