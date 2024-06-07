package ir.bigz.springboot.backend.services;

import ir.bigz.springboot.backend.dtos.CredentialsDto;
import ir.bigz.springboot.backend.dtos.SignUpDto;
import ir.bigz.springboot.backend.dtos.UserDto;
import ir.bigz.springboot.backend.entities.User;
import ir.bigz.springboot.backend.exceptions.AppException;
import ir.bigz.springboot.backend.mappers.UserMapper;
import ir.bigz.springboot.backend.repositoires.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserMapper userMapper;

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByLogin(credentialsDto.getLogin())
                .orElseThrow(() -> new AppException("UnKnown user", HttpStatus.NOT_FOUND));

        if(passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }

        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalUser = userRepository.findByLogin(userDto.getLogin());

        if(optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(userDto);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));

        return userMapper.toUserDto(userRepository.save(user));
    }

    public UserDto findByLogin(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow( () -> new AppException("UnKnown user", HttpStatus.NOT_FOUND));

        return userMapper.toUserDto(user);
    }
}
