import Vezgo from '../src';
import Teams from '../src/resources/teams';

// mock Team class
vi.mock('../src/resources/teams', () => {
  // Define a mock class to track instances
  class MockTeam {
    constructor() {
      MockTeam.instances.push(this);
      this.info = vi.fn();
    }
  }
  MockTeam.instances = [];

  return { default: MockTeam };
});

describe('Vezgo instance', () => {
  describe('.login()', () => {
    test('should return a Vezgo User instance', () => {
      const user = Vezgo.init({ clientId: 'test', secret: 'test' }).login('test');
      // Test API instance has been `init`ed
      expect(user.accounts).toHaveProperty('getList');
    });

    test('should require loginName in NodeJs', () => {
      mockNode();
      expect(() => Vezgo.init({ clientId: 'test', secret: 'test' }).login()).toThrow(/loginName/);
    });

    test('should NOT require loginName in Browser & ReactNative', () => {
      mockBrowser();
      expect(() => Vezgo.init({ clientId: 'test', secret: 'test' }).login()).not.toThrow(
        /loginName/
      );

      mockReactNative();
      expect(() => Vezgo.init({ clientId: 'test', secret: 'test' }).login()).not.toThrow(
        /loginName/
      );
    });
  });

  describe('.getTeam()', () => {
    test('should call teams.info()', () => {
      const vezgo = Vezgo.init({ clientId: 'test', secret: 'test' });
      vezgo.getTeam();
      expect(vezgo.teams.info).toHaveBeenCalled();
    });
  });
});
