import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/getUserList', controller.user.getUserList);
  router.post('/addUser', controller.user.addUser);
  router.get('/api/v1/dictionaries', controller.dictionary.getDictionaryList);
  router.post('/api/v1/dictionary', controller.dictionary.createDictionary);
  router.patch('/api/v1/dictionary/:id', controller.dictionary.updateDictionary);
  router.delete('/api/v1/dictionary/:id', controller.dictionary.delDictionary);
};
