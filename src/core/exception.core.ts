class Exception extends Error {
	statusCode: number;
	constructor(message: string | undefined, statusCode: number) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode || 500; // Default to 500 (Internal Server Error)
		Error.captureStackTrace(this, this.constructor);
	}
}

class NotFoundException extends Exception {
	constructor(message = "Resource not found") {
		super(message, 404);
	}
}

class ServerErrorException extends Exception {
	constructor(message = "Internal server error") {
		super(message, 500);
	}
}

class PermissionException extends Exception {
	constructor(message = "You don't have permission to access this resource") {
		super(message, 403);
	}
}

class ValidationException extends Exception {
	constructor(message = "Validation failed") {
		super(message, 422);
	}
}

class BadRequestException extends Exception {
	constructor(message = "Bad request") {
		super(message, 400);
	}
}

class UnauthorizedException extends Exception {
	constructor(message = "Unauthorized access") {
		super(message, 401);
	}
}

class ConflictException extends Exception {
	constructor(message = "Conflict with current state of the resource") {
		super(message, 409);
	}
}

class UnprocessableEntityException extends Exception {
	constructor(message = "Unprocessable entity") {
		super(message, 422);
	}
}

class TooManyRequestsException extends Exception {
	constructor(message = "Too many requests, please try again later") {
		super(message, 429);
	}
}

class ServiceUnavailableException extends Exception {
	constructor(message = "Service is unavailable, please try again later") {
		super(message, 503);
	}
}

export {
	Exception,
	NotFoundException,
	PermissionException,
	ServerErrorException,
	ValidationException,
	BadRequestException,
	UnauthorizedException,
	ConflictException,
	UnprocessableEntityException,
	TooManyRequestsException,
	ServiceUnavailableException,
};
