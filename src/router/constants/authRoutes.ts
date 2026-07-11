export const authRoutes = {
  categories: { route: 'categories', path: '/categories' },
  subjects: { route: 'categories/subjects', path: '/categories/subjects' },
  findOffers: {
    route: 'categories/subjects/find-offers',
    path: '/categories/subjects/find-offers'
  },
  userProfile: { route: 'user/:id', path: '/user' },
  myResources: {
    root: { route: 'my-resources', path: '/my-resources' },
    newQuestion: {
      route: 'my-resources/new-question',
      path: '/my-resources/new-question'
    },
    editQuestion: {
      route: 'my-resources/edit-question/:id',
      path: '/my-resources/edit-question'
    },
    newLesson: {
      route: 'my-resources/new-lesson',
      path: '/my-resources/new-lesson'
    },
    editLesson: {
      route: 'my-resources/edit-lesson/:id',
      path: '/my-resources/edit-lesson'
    },
    lesson: {
      route: 'my-resources/lesson/:id',
      path: '/my-resources/lesson'
    }
  },
  accountMenu: {
    myProfile: { route: 'my-profile', path: '/my-profile' },
    logout: { route: 'logout', path: '/logout' }
  }
}
