type ApiError = {
  errors: {
    code: number;
    description: string;
    level: string;
    locale: string;
    message: string;
  };
  requestId: string;
  service: string;
};
