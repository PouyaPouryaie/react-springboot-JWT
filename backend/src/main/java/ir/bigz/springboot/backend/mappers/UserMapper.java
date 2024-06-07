package ir.bigz.springboot.backend.mappers;

import ir.bigz.springboot.backend.dtos.SignUpDto;
import ir.bigz.springboot.backend.dtos.UserDto;
import ir.bigz.springboot.backend.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);
}
