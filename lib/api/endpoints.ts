export const API = {
  AUTH: {
    SIGNUP_POST: "/api/auth/signup",
    LOGIN_POST: "/api/auth/login",
  },
  ENTRY: {
    CREATE_POST: "/entries",
    FEEDBACK_PATCH: (entryId: number) => `/entries/${entryId}/feedback`,
  },
  RECORD: {
    CALENDAR_GET: "/records/calendar",
    DAILY_GET: (date: string) => `/records/daily/${date}`,
  },
  USER: {
    _GET: "/users/me",
    _DELETE: "/users/me",
    _PATCH: "/users/me",
  },
  ADMIN: {
    RESET_QUOTA_POST: "/admin/quota/reset",
  },
  DRILL: {
    TODAY_GET: "/drills/today",
  },
  ML_FORWARD: {
    INSIGHT: {
      _GET: "/insights",
      CREATE_POST: "/insights",
    },
    WEEKLY_QUIZ_POST: "/weekly/quiz",
    REPORT: {
      MARK_READ_PATCH: (id: number) => `/reports/${id}/read`,
      _GET: "/reports/pending",
    },
    EXPORT_GET: "/export",
    DRILL: { _GET: "/drills", DETAIL_GET: (id: number) => `/drills/${id}` },
  },
};
