// useAuth.test.js
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from '@hooks/useAuth';

test('useAuth performs signIn and sets user info', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useAuth());

  act(() => {
    result.current.signIn();
  });

  await waitForNextUpdate();

  expect(result.current.userInfo).toBeDefined();
  expect(result.current.authTokens).toBeDefined();
});
