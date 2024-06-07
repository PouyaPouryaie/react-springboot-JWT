package ir.bigz.springboot.backend.config;

import ir.bigz.springboot.backend.dtos.ErrorDto;
import ir.bigz.springboot.backend.exceptions.AppException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler( value = {AppException.class})
    @ResponseBody
    public ResponseEntity<ErrorDto> handleException(AppException appException) {
        return ResponseEntity
                .status(appException.getStatus())
                .body(ErrorDto.builder().message(appException.getMessage()).build());
    }
}
