package deposit;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;



@RestController
@RequestMapping("/download")
public class DepositContorller {
	@GetMapping("/download")
	public ResponseEntity<InputStreamResource> downloadFiel()throws IOException {
		
		File file = new File("src/main/resources/file/file.pdf");
		InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
		return ResponseEntity.ok()
			  .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
			  .contentType(MediaType.APPLICATION_PDF)
			  .body(resource);
				
				
	}
	

}
