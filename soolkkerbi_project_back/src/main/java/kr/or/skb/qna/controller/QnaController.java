package kr.or.skb.qna.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.skb.FileUtil;
import kr.or.skb.notice.model.vo.Notice;
import kr.or.skb.notice.model.vo.NoticeFile;
import kr.or.skb.qna.model.service.QnaService;
import kr.or.skb.qna.model.vo.Answer;
import kr.or.skb.qna.model.vo.Qna;

@RestController
@RequestMapping(value="/qna")
public class QnaController {
	@Autowired
	private QnaService qnaService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	//게시물 조회
	@GetMapping(value="/list/{reqPage}")
	public Map list(@PathVariable int reqPage) {
		Map map = qnaService.qnaList(reqPage);
		return map;
	}
	
	//게시글 작성
	//Board b: boardTitle, boardDetail
	@PostMapping(value="/insert")
	public int insertQna(@ModelAttribute Qna q) {// @RequestAttribute String memberId
		System.out.println("qnaController: "+q);
//		System.out.println(memberId);
//		q.setMemberId(memberId);
		int result = qnaService.insertQna(q);
		return result;
	}
	//텍스트 에디터 파일 업로드
	@PostMapping(value="/contentImg")
	public String contentImg(@ModelAttribute MultipartFile image) {
		String savepath = root+"qna/editor/";
		String filename = image.getOriginalFilename();
		String filepath = fileUtil.getFilepath(savepath, filename, image);
		return "/qna/editor/"+filepath; //실제 파일이 해당경로에 업로드 됨	
	}
	
	//게시글 상세
	@GetMapping(value="/view/{qnaNo}")
	public Qna view(@PathVariable int qnaNo) {
		System.out.println("view: "+qnaNo);
		return qnaService.selectOneQna(qnaNo);
	}
	
	//게시글 삭제
	@GetMapping(value="/delete/{qnaNo}")
	public int deleteQna(@PathVariable int qnaNo) {		
		System.out.println("qnaController - qnaNo: "+qnaNo);
		int result = qnaService.delete(qnaNo);
		System.out.println(result);
		if(result > 0) {
			return 1;
		}else {
			return 0;
		}
	}
	
	//게시글 수정
	@PostMapping(value="/modify")
	public int modify(@ModelAttribute Qna q) {
		System.out.println("modify: "+q.getQnaNo());
		System.out.println("modify: "+q.getQnaTitle());
		System.out.println("modify: "+q.getQnaContent());
		
		//Board table 업데이트
		int result = qnaService.modify(q);
		if(result > 0) {
			return 1;
		}else {
			return 0;
		}
	}
	
	//댓글 작성
	@PostMapping(value="/registAnswer")
	public int insertComment(@ModelAttribute Answer a) {
		System.out.println("registAnswer - answerQnaNo: "+a.getAnswerQnaNo());
		System.out.println("registAnswer - answerContent: "+a.getAnswerContent());
		int result = qnaService.registAnswer(a);
		return result;
	}
	
	//댓글 출력
	@GetMapping(value="/printAnswer/{answerQnaNo}")
	public List printAnswer(@PathVariable int answerQnaNo) {
		System.out.println("answerQnaNo: "+answerQnaNo);
		List answerContent = qnaService.printAnswer(answerQnaNo);
		return answerContent;
	}
	
	//댓글 삭제
	@GetMapping(value="/deleteAnswer/{answerNo}")
	public int deleteAnswer(@PathVariable int answerNo) {
		System.out.println("answerNo: "+answerNo);
		return qnaService.deleteAnswer(answerNo);
	}
}
