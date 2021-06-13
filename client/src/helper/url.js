export const FETCH = Object.freeze({
    BASE_URL:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3003/api/v1'
            : 'https://todo-backend-julschong.herokuapp.com/api/v1'
});
