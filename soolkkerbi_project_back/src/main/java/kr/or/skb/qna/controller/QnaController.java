package kr.or.skb.qna.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.skb.qna.model.service.QnaService;

@RestController
@RequestMapping(value="/qna")
public class QnaController {
	@Autowired
	private QnaService qnaService;
	
	//게시물 조회
	@GetMapping(value="/list/{reqPage}")
	public Map list(@PathVariable int reqPage) {
		Map map = qnaService.qnaList(reqPage);
		return map;
	}
}
