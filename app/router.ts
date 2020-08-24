import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/getUserList', controller.user.getUserList);
  router.post('/addUser', controller.user.addUser);
  router.get('/getDictionaryList', controller.dictionary.getDictionaryList);
  router.post('/addDictionary', controller.dictionary.addDictionary);
};
