import {Server} from './app';
import * as express from "express";

/* 따로 설정하지 않았으면 3000 port를 사용한다. */
const port: number = process.env.PORT || 3000;
const app: express.Application = new Server().app;
app.set('port', port);

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + port);
}).on('error', err => {
    console.error(err);
});