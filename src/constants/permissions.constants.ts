export namespace PermissionsConstant {
  export const flags = {
    ADMIN: 'ADMIN',
    DEPARTMENT: {
      CREATE: 'DEPARTMENT_CREATE',
      UPDATE: 'DEPARTMENT_UPDATE',
      GET_BY_ID: 'DEPARTMENT_GET_BY_ID',
      LIST: 'DEPARTMENT_LIST',
    },
    SESSION: {
      DISABLE: 'SESSION_DISABLE',
      LIST: 'SESSION_LIST',
    },
    TEAM: {
      CREATE: 'TEAM_CREATE',
      UPDATE: 'TEAM_UPDATE',
      LIST: 'TEAM_LIST',
      GET_BY_ID: 'TEAM_GET_BY_ID',
      LIST_USERS_BY_TEAM: 'TEAM_LIST_USERS_BY_TEAM',
    },
    USER: {
      LIST: 'USER_LIST',
      GET_BY_ID: 'USER_GET_BY_ID',
      REGISTER: 'USER_REGISTER',
      DISABLE: 'USER_DISABLE',
      HARD_DISABLE: 'USER_HARD_DISABLE',
      UPDATE: 'USER_UPDATE',
      UPDATE_PERMISSION: 'USER_UPDATE_PERMISSION',
      SET_PIN: 'USER_SET_PIN',
      ACTIVATE: 'USER_ACTIVATE',
      UPDATE_PHOTO: 'USER_UPDATE_PHOTO',
      RESEND_FIRST_LOGIN_EMAIL: 'RESEND_FIRST_LOGIN_EMAIL',
    },
  };

  export const list = () => {
    const pemsArr: string[] = [];

    Object.keys(PermissionsConstant.flags).forEach(i => {
      if (typeof PermissionsConstant.flags[i] === 'string') {
        pemsArr.push(PermissionsConstant.flags[i]);
        return;
      }

      if (typeof PermissionsConstant.flags[i] === 'object') {
        Object.keys(PermissionsConstant.flags[i]).forEach(j =>
          pemsArr.push(PermissionsConstant.flags[i][j]),
        );
      }
    });

    return pemsArr;
  };
}
