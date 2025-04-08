package com.boot.sound.jwt.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;


//보안 컨텍스트(SecurityContext)에 인증 빈(Authentication)을 추가하면, 모든 컨트롤러에서 @AuthenticationPrincipal을 입력 매개변수로 추가할 수 있다. 
//public ResponseEntity< > reqularEndpoint(@AuthenticationPrincipal UserDTO) => 인증된 사용자를 주입
//따라서 Filter는 인증된 사용자의 개체를 Controller에 제공한다. 인증빈을 반환하기 위해

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {  // 요청당 한번만 사용되기를 원하므로 OncePerRequestFilter 사용
	
	private final UserAuthProvider userAuthProvider;
	
//	private UserAuthProvider userAuthProvider;
//
//	public JwtAuthFilter(UserAuthProvider userAuthProvider) {
//		super();
//		this.userAuthProvider = userAuthProvider;
//	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		System.out.println("<<< JwtAuthFilter - doFilterInternal() >>>");
		
		String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		
		if(header != null) {    // 길이가 정확하고 Bearer 토큰이어야 한다.
			String[] elements = header.split(" ");
			
			if(elements.length == 2 && "Bearer".equals(elements[0])) {
				try {
					// 자격증명이 유효하면 보안 컨텍스트에 인증빈을 추가한다.
					SecurityContextHolder.getContext().setAuthentication(userAuthProvider.validationToken(elements[1]));
				} catch (AuthenticationException e) {
				    System.out.println("❗ 인증 예외 발생: " + e.getMessage());
				    SecurityContextHolder.clearContext();

				    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				    response.setContentType("application/json;charset=UTF-8");
				    response.getWriter().write("{\"message\": \"" + e.getMessage() + "\"}");
				    return;
				}
			}
		}
		
		filterChain.doFilter(request, response);  // 필터끝에서 doFilter() 메서드 호출
		
	}

}
