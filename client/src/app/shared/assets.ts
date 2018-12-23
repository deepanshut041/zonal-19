import { environment } from '../../environments/environment';
export let DOMAIN: any;
export let ASSETS: any;

if (!environment['production']) {
  DOMAIN = 'http://localhost:8000';
  ASSETS = './assets'
} else {
  DOMAIN = '.';
  ASSETS = "/static/ang/assets"
}