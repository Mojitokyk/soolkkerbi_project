package kr.or.skb.taste.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.skb.FileUtil;
import kr.or.skb.taste.model.service.TasteService;
import kr.or.skb.taste.model.vo.Taste;

@RestController 
@RequestMapping(value = "/taste")
public class TasteController {

	@Autowired
	private TasteService tasteService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	@GetMapping(value = "/list/{reqPage}")
	public Map list(@PathVariable int reqPage) {
		Map map = tasteService.partyList(reqPage);
		return map;

	}
	
	//시음회 게시글 상세보기
	@GetMapping(value = "/view/{tasteNo}") 
	public Taste view(@PathVariable int tasteNo) {
		System.out.println("tasteNo - controller: "+tasteNo);
		return tasteService.selectOneTaste(tasteNo);
	}
	
	//시음회 게시글 삭제
	@GetMapping(value="/delete/{tasteNo}")
	public int deleteTaste(@PathVariable int tasteNo) {
		System.out.println("tasteNo - controller: "+tasteNo);
		return 0;
	}

	//시음회 게시글 수정
	@PostMapping(value="/modify")
	public int modifyTaste() {
		return 0;
	}
	@PostMapping(value = "/insert")
	public int insertTaste(@ModelAttribute Taste t,@ModelAttribute MultipartFile thumbnail, @RequestAttribute String memberId ) {
		t.setMemderId(memberId);
		String savepath = root + "taste/";
		if (thumbnail != null) {
			String filename = thumbnail.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, thumbnail);
			t.setTasteFilepath(filepath);

		}
		System.out.println(t);
		int result = tasteService.insertTaste(t);
		return result;
	}
}
