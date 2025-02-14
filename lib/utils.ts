export const checkFinally = () => {
  try {
    console.log('try');
    throw new Error('error');
  } catch (error) {
    console.log('catch');
    throw error;
  } finally {
    console.log('finally');
  }
}

checkFinally();
