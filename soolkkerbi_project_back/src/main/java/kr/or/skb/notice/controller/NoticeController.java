package kr.or.skb.notice.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import kr.or.skb.notice.model.vo.Notice;
import kr.or.skb.FileUtil;
import kr.or.skb.notice.model.service.NoticeService;


@RestController
@RequestMapping(value="/notice")
public class NoticeController {
	@Autowired
	private NoticeService noticeService;
	@Autowired
	private FileUtil  fileUtil;
	@Value("${file.root}")
	private String root;
	
	//게시물 조회
	@GetMapping(value="/list/{reqPage}")
	public Map list(@PathVariable int reqPage) {
		Map map = noticeService.noticeList(reqPage);
		return map;
	}
	
	//게시글 작성
	@PostMapping(value="/insert")
	public int insertNotice(@RequestBody Notice n) {
		System.out.println(n);
		int result = noticeService.insertNotice(n);
		return result;
	}
	
	//게시글 상세
	@GetMapping(value="/view/{noticeNo}")
	public Notice view(@PathVariable int noticeNo) {
		System.out.println(noticeNo);
		return noticeService.selectOneNotice(noticeNo);
	}

	
	//텍스트 에디터 파일 업로드
	@PostMapping(value="/contentImg")
	public String contentImg(@ModelAttribute MultipartFile image) {
		String savepath = root+"notice/editor/";
		String filename = image.getOriginalFilename();
		String filepath = fileUtil.getFilepath(savepath, filename, image);
		return "/notice/editor/"+filepath; //실제 파일이 해당경로에 업로드 됨	
	}
	
	//게시글 삭제
	@GetMapping(value="/delete/{noticeNo}")
	public int deleteNotice(@PathVariable int noticeNo) {
		int result = noticeService.delete(noticeNo);
		return result;
	}
	
	//게시글 수정
	@PostMapping(value="/modify")
	public int modify(@ModelAttribute Notice n, @ModelAttribute MultipartFile thumbnail, @ModelAttribute MultipartFile[] noticeFile) {
		System.out.println(n.getNoticeTitle());
		System.out.println(n.getNoticeContent());
		return noticeService.modify(n);

	}
}
