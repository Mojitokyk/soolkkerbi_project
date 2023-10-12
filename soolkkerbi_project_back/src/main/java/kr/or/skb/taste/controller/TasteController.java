package kr.or.skb.taste.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}