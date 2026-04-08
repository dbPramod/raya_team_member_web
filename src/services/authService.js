const AUTH_STORAGE_KEY = 'swann-auth-users';
const CHALLENGE_STORAGE_KEY = 'swann-auth-challenges';
const ACTIVE_RESET_KEY = 'swann-active-reset';

const wait = (ms = 700) => new Promise((resolve) => {
  window.setTimeout(resolve, ms);
});

const readStorage = (key, fallback) => {
  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const defaultUsers = [
  {
    id: 'user-1',
    name: 'Sapphire Bright',
    email: 'test123@gmail.com',
    password: 'password@123'
  }
];

const getUsers = () => {
  const existingUsers = readStorage(AUTH_STORAGE_KEY, null);

  if (existingUsers) {
    return existingUsers;
  }

  writeStorage(AUTH_STORAGE_KEY, defaultUsers);
  return defaultUsers;
};

const saveUsers = (users) => {
  writeStorage(AUTH_STORAGE_KEY, users);
};

const getChallenges = () => readStorage(CHALLENGE_STORAGE_KEY, []);

const saveChallenges = (challenges) => {
  writeStorage(CHALLENGE_STORAGE_KEY, challenges);
};

const createOtp = () => '123456';

const createChallenge = ({ email, flow }) => {
  const challenge = {
    id: `challenge-${Date.now()}`,
    email,
    flow,
    otp: createOtp(),
    verified: false,
    createdAt: Date.now()
  };

  const challenges = getChallenges().filter((item) => item.email !== email || item.flow !== flow);
  challenges.push(challenge);
  saveChallenges(challenges);

  return challenge;
};

const updateChallenge = (challengeId, updater) => {
  const challenges = getChallenges();
  const nextChallenges = challenges.map((challenge) => (
    challenge.id === challengeId ? updater(challenge) : challenge
  ));

  saveChallenges(nextChallenges);
  return nextChallenges.find((challenge) => challenge.id === challengeId);
};

const getChallenge = (challengeId) => getChallenges().find((challenge) => challenge.id === challengeId);

export const authService = {
  async login({ email, password }) {
    await wait();
    const users = getUsers();
    const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password) {
      return Promise.reject({ message: 'Invalid email or password.' });
    }

    const challenge = createChallenge({ email: user.email, flow: 'login' });

    return {
      success: true,
      message: 'OTP sent successfully.',
      challengeId: challenge.id,
      email: user.email,
      otp: challenge.otp
    };
  },

  async register({ name, email, password }) {
    await wait();
    const users = getUsers();
    const existingUser = users.find((item) => item.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      return Promise.reject({ message: 'An account with this email already exists.' });
    }

    const nextUsers = [
      ...users,
      {
        id: `user-${Date.now()}`,
        name,
        email,
        password
      }
    ];

    saveUsers(nextUsers);
    const challenge = createChallenge({ email, flow: 'register' });

    return {
      success: true,
      message: 'Account created. OTP sent successfully.',
      challengeId: challenge.id,
      email,
      otp: challenge.otp
    };
  },

  async requestPasswordReset({ email }) {
    await wait();
    const users = getUsers();
    const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return Promise.reject({ message: 'We could not find an account with that email.' });
    }

    const challenge = createChallenge({ email: user.email, flow: 'forgot' });

    return {
      success: true,
      message: 'Reset OTP sent successfully.',
      challengeId: challenge.id,
      email: user.email,
      otp: challenge.otp
    };
  },

  async resendOtp({ challengeId }) {
    await wait(500);
    const challenge = getChallenge(challengeId);

    if (!challenge) {
      return Promise.reject({ message: 'Your verification session expired. Please start again.' });
    }

    const refreshedChallenge = updateChallenge(challengeId, (current) => ({
      ...current,
      otp: createOtp(),
      createdAt: Date.now()
    }));

    return {
      success: true,
      message: 'A new OTP has been sent.',
      challengeId: refreshedChallenge.id,
      email: refreshedChallenge.email,
      otp: refreshedChallenge.otp
    };
  },

  async verifyOtp({ challengeId, otp }) {
    await wait(500);
    const challenge = getChallenge(challengeId);

    if (!challenge) {
      return Promise.reject({ message: 'Your verification session expired. Please start again.' });
    }

    if (challenge.otp !== otp) {
      return Promise.reject({ message: 'The OTP you entered is incorrect.' });
    }

    const verifiedChallenge = updateChallenge(challengeId, (current) => ({
      ...current,
      verified: true
    }));

    if (verifiedChallenge.flow === 'forgot') {
      writeStorage(ACTIVE_RESET_KEY, {
        challengeId: verifiedChallenge.id,
        email: verifiedChallenge.email
      });
    }

    return {
      success: true,
      flow: verifiedChallenge.flow,
      email: verifiedChallenge.email,
      challengeId: verifiedChallenge.id
    };
  },

  async resetPassword({ challengeId, password }) {
    await wait();
    const challenge = getChallenge(challengeId);

    if (!challenge || challenge.flow !== 'forgot' || !challenge.verified) {
      return Promise.reject({ message: 'Please verify your OTP before resetting the password.' });
    }

    const users = getUsers();
    const nextUsers = users.map((user) => (
      user.email.toLowerCase() === challenge.email.toLowerCase()
        ? { ...user, password }
        : user
    ));

    saveUsers(nextUsers);
    window.localStorage.removeItem(ACTIVE_RESET_KEY);

    return {
      success: true,
      message: 'Password updated successfully.'
    };
  },

  getActiveResetSession() {
    return readStorage(ACTIVE_RESET_KEY, null);
  }
};

export default authService;
