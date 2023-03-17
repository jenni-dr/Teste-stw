import NProgress from 'nprogress'
import 'nprogress/nprogress.css';

export class LoaderService {
    static start() {
        NProgress.start();
        NProgress.set(0.1);
        NProgress.inc();
    }

    static done() {
        NProgress.done();
    }
}