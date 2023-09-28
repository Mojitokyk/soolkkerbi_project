package kr.or.skb.notice.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.skb.notice.model.service.NoticeService;

@RestController
@RequestMapping(value="/notice")
public class NoticeController {
	@Autowired
	private NoticeService noticeService;
	
	//게시물 조회
	@GetMapping(value="/list/{reqPage}")
	public Map list(@PathVariable int reqPage) {
		Map map = noticeService.noticeList(reqPage);
		return map;
	}
}
