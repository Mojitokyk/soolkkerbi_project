package kr.or.skb.notice.controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.board.model.vo.Board;
import kr.or.iei.board.model.vo.BoardFile;
import kr.or.skb.notice.model.service.NoticeService;
import kr.or.skb.notice.model.vo.Notice;

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
	
	//게시글 작성
	//Board b: boardTitle, boardDetail
	//MultipartFile thumbnail: thumbnail
	//MultipartFile[] boardFile: 첨부파일
	@PostMapping(value="/insert")
	public int insertNotice(@ModelAttribute Notice n, @ModelAttribute MultipartFile thumbnail, @ModelAttribute MultipartFile[] noticeFile, @RequestAttribute String memberId) {
		System.out.println(b);
		System.out.println(memberId);
		
		b.setMemberId(memberId);
		String savepath = root+"board/"; //root: C/Temp/react_web
		if(thumbnail != null) {		
			System.out.println(thumbnail.getOriginalFilename());
			String filename = thumbnail.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, thumbnail);
			b.setBoardImg(filepath);
		}
		ArrayList<BoardFile> fileList = new ArrayList<BoardFile>();
		if(boardFile != null) {
			/*
			for(int i=0;i<boardFile.length;i++) {
				System.out.println(boardFile[i].getOriginalFilename());
			}
			*/
			for(MultipartFile file : boardFile) {
				String filename = file.getOriginalFilename();
				String filepath = fileUtil.getFilepath(savepath, filename, file);
				BoardFile bf = new BoardFile();
				bf.setFilename(filename);
				bf.setFilepath(filepath);
				fileList.add(bf);
			}
		}
		int result = boardService.insertBoard(b, fileList);
		return result;
	}
}
