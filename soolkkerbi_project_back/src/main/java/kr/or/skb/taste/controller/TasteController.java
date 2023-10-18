package kr.or.skb.taste.controller;

import java.io.File;
import java.util.ArrayList;

import java.util.List;
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
import kr.or.skb.reservation.model.vo.Reservation;
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
	
	//시음회 목록 조회
	@GetMapping(value = "/list/{reqPage}")
	public Map list(@PathVariable int reqPage) {
		Map map = tasteService.partyList(reqPage);
		return map;
	}
	
	//시음회 등록
	@PostMapping(value = "/insert")
	public int insertTaste(@ModelAttribute Taste t, @ModelAttribute MultipartFile thumbnail, @RequestAttribute String memberId ) {
		t.setMemberId(memberId);
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
	//시음회 등록 - 텍스트 에디터 파일 업로드
	@PostMapping(value="/contentImg")
	public String tasteImg(@ModelAttribute MultipartFile image) {
		String savepath = root+"taste/editor/";
		String filename = image.getOriginalFilename();
		String filepath = fileUtil.getFilepath(savepath, filename, image);
		return "/taste/editor/"+filepath;
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
		System.out.println("controller delete");
		Taste taste = tasteService.delete(tasteNo);
		if(taste != null) {
			String savepath = root+"taste/";
			File file = new File(savepath + taste.getTasteFilepath());
			file.delete();
			
			return 1;
		}else {
			return 0;			
		}
	}

	
	//시음회 예약 등록
	@PostMapping(value="/insertReservation")
	public int insertReservation(@ModelAttribute Reservation r, @RequestAttribute String memberId) {
		System.out.println("tasteController - memberId: "+memberId);
		r.setReservationMemberId(memberId);
		System.out.println("tasteController - rservation: "+r);
		int result = tasteService.insertReservation(r);
		return result;

	}
	
	
	//시음회 게시글 수정
	@PostMapping(value="/modify")
	public int modify(@ModelAttribute Taste t,@ModelAttribute MultipartFile thumbnail) {
		System.out.println(t.getTasteTitle());
		System.out.println(t.getTasteContent());
		System.out.println(t.getTasteFilepath());
		System.out.println(thumbnail);
		//Board table 업데이트, 
		//썸네일이 들어오면 -> 썸네일 교체, 썸네일 없으면 기존 썸네일로 덮어쓰기
		//Board_file 테이블 업데이트 -> 삭제한게 있으면 삭제, 추가한 거 있으면 insert
		//삭제한 파일 있으면 파일 물리적 삭제
		if(t.getTasteFilepath().equals("null")) {
			t.setTasteFilepath(null);
		}
		String savepath = root+""
				+ "taste/";
		if(thumbnail != null) {
			//System.out.println(thumbnail.getOriginalFilename());
			String filepath = fileUtil.getFilepath(savepath, thumbnail.getOriginalFilename(), thumbnail);
			t.setTasteFilepath(filepath);
		}
		System.out.println(t);
		int  changeList = tasteService.modify(t);
	   return changeList;
		
		
	}
}
