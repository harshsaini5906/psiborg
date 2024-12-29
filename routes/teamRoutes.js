import express from 'express'
import {createTeam,addUserToTeam,teamDetail} from '../controllers/TeamController.js'
import { authenticateToken} from "../middleware/middlewareFunction.js"



const teamRoute =express.Router();
teamRoute.post('/createTeam',authenticateToken,createTeam);
teamRoute.post('/addUserToTeam',authenticateToken,addUserToTeam);
teamRoute.get('/teamDetail',authenticateToken,teamDetail);

export default teamRoute;