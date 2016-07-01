import * as express from "express";

export class Server {
    /* app에 대한 타입 설정 */
    public app: express.Application;

    constructor() {
        /* express 설정을 위한 express 선언 */
        this.app = express();
        /* 라우터 */
        this.router();

        /* Not Foud */
        this.app.use((req: express.Request, res: express.Response, next: Function) => {
            /**
             *  Error이라는 정의가 있지만 Error에는 status라는 정의가 없어서 any 설정
             *  (아마 typescript로 개발하다보면 any를 많이 쓰게된다) 
             */
            const err: any = new Error('not_found');
            err.status = 404;
            next(err);
        });

        /* 에러 처리 */
        this.app.use((err: any, req: express.Request, res: express.Response) => {
            err.status  = err.status || 500;
            console.error(`error on requst ${req.method} | ${req.url} | ${err.status}`);
            console.error(err.stack || `${err.message}`);

            err.message = err.status  == 500 ? 'Something bad happened.' : err.message;
            res.status(err.status).send(err.message);
        });
    }

    private router() {
        /**
         * 에러 처리를 좀더 쉽게 하기 위해서 한번 감싸준다.
         * es7에 제안된 async await를 사용하여 에러처리시 catch가 되기 편하게 해준 방식이다.
         * http://expressjs.com/ko/advanced/best-practice-performance.html#section-8 을 참고하면 좋다.
         */
        const wrap = fn => (req, res, next) => fn(req, res, next).catch(next);
        //get router
        const router: express.Router = express.Router();

        //get
        router.get("/", wrap(async (req, res) => {
            res.status(200).json({result: "Hello World"})
        }));

        //post
        router.post("/", wrap(async (req, res) => {
            res.status(200).json({result: "Hello World"})
        }));

        //put
        router.put("/",  wrap(async (req, res) => {
            res.status(200).json({result: "Hello World"})
        }));

        //delete
        router.delete("/",  wrap(async (req, res) => {
            res.status(200).json({result: "Hello World"})
        }));

        this.app.use(router);
    }
}