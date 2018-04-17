import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    followAdd: ['following'],
    followCheck: ['following'],
    setTabIndex: ['index'],
    getFollowings: null,
}, {});

export {
    Types,
    Creators,
}