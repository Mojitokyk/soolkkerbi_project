package kr.or.skb.notice.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.skb.notice.model.vo.NoticeFile;
import kr.or.skb.notice.model.vo.Notice;
import kr.or.skb.FileUtil;
import kr.or.skb.notice.model.service.NoticeService;
import kr.or.skb.notice.model.vo.Notice;

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
	//Board b: boardTitle, boardDetail
	//MultipartFile thumbnail: thumbnail
	//MultipartFile[] boardFile: 첨부파일
	@PostMapping(value="/insert")
	public int insertNotice(@ModelAttribute Notice n, @ModelAttribute MultipartFile thumbnail, @ModelAttribute MultipartFile[] noticeFile) {// @RequestAttribute String memberId
		System.out.println(n);
//		System.out.println(memberId);
		
//		n.setMemberId(memberId);
		String savepath = root+"notice/"; //root: C/Temp/react_web
		if(thumbnail != null) {		
			System.out.println(thumbnail.getOriginalFilename());
			String filename = thumbnail.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, thumbnail);
			n.setNoticeImg(filepath);
		}
		ArrayList<NoticeFile> fileList = new ArrayList<NoticeFile>();
		if(noticeFile != null) {
			/*
			for(int i=0;i<boardFile.length;i++) {
				System.out.println(boardFile[i].getOriginalFilename());
			}
			*/
			for(MultipartFile file : noticeFile) {
				String filename = file.getOriginalFilename();
				String filepath = fileUtil.getFilepath(savepath, filename, file);
				NoticeFile nf = new NoticeFile();
				nf.setNoticeFileName(filename);
				nf.setNoticeFilePath(filepath);
				fileList.add(nf);
			}
		}
		int result = noticeService.insertNotice(n, fileList);
		return result;
	}
	
	//게시글 상세
	@GetMapping(value="/view/{noticeNo}")
	public Notice view(@PathVariable int noticeNo) {
		System.out.println(noticeNo);
		return noticeService.selectOneNotice(noticeNo);
	}
	//게시글 파일 다운로드
	//ResponseEntity<Resource>: 파일 다운로드용 반환타입
	@GetMapping(value="/filedown/{noticeFileNo}")
	public ResponseEntity<Resource> filedown(@PathVariable int noticeFileNo) throws FileNotFoundException, UnsupportedEncodingException{
		NoticeFile noticeFile = noticeService.getNoticeFile(noticeFileNo);
		System.out.println(noticeFile);
		String  savepath = root+"notice/";
		File file = new File(savepath + noticeFile.getNoticeFilePath());
		Resource resource = new InputStreamResource(new FileInputStream(file));
		String encodeFile = URLEncoder.encode(noticeFile.getNoticeFileName(), "UTF-8");
		
		HttpHeaders header = new HttpHeaders();
		header.add("Content-Disposition", "attachment; filename=\""+encodeFile+"\"");
		header.add("Cache-Control", "no-cache, no-store, must-revalidate");
		header.add("Pragma", "no-cache");
		header.add("Expires", "0");
		
		return ResponseEntity.status(HttpStatus.OK).headers(header).contentLength(file.length()).contentType(MediaType.APPLICATION_OCTET_STREAM).body(resource);
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
		//해당 게시글의 첨부파일 삭제를 위해 파일 목록 결과물을 받음
		List<NoticeFile> fileList = noticeService.delete(noticeNo);//첨부파일을 지우기 위해 List<BoardFile>로 받음
		if(fileList != null) {
			String savepath = root+"board/";
			for(NoticeFile noticeFile : fileList) {
				File file = new File(savepath + noticeFile.getNoticeFilePath());
				file.delete();
			}
			return 1;
		}else {
			return 0;
		}
	}
	
	//게시글 수정
	@PostMapping(value="/modify")
	public int modify(@ModelAttribute Notice n, @ModelAttribute MultipartFile thumbnail, @ModelAttribute MultipartFile[] noticeFile) {
		System.out.println(n.getNoticeTitle());
		System.out.println(n.getNoticeContent());
		System.out.println(n.getDelFileNo());
		System.out.println(thumbnail);
		
		//Board table 업데이트
		//썸네일이 들어오면 -> 썸네일 교체, 섬네일이 없으면 기존 썸네일로 덮어쓰기
		//Board_file 테이블 업데이트 -> 삭제한 것이 있으면 삭제, 추가한 것이 있으면 insert
		//삭제한 파일 있으며 파일 물리적 삭제
		String savepath = root + "notice/"; //새로운 썸네일 저장 경로
		if(thumbnail != null) {
			System.out.println(thumbnail.getOriginalFilename());
			
			String filepath = fileUtil.getFilepath(savepath, thumbnail.getOriginalFilename(), thumbnail);
		}
		System.out.println(noticeFile);
		ArrayList<NoticeFile> fileList = new ArrayList<NoticeFile>();
		if(noticeFile != null) {
			for(MultipartFile file : noticeFile) {
				System.out.println(file.getOriginalFilename());
				
				String filename = file.getOriginalFilename();
				String filepath = fileUtil.getFilepath(savepath, filename, file);
				NoticeFile nf = new NoticeFile();
				nf.setNoticeNo(n.getNoticeNo());
				nf.setNoticeFileName(filename);
				nf.setNoticeFilePath(filepath);
				fileList.add(nf);
			}
		}
		//DB에서 삭제한 파일이 있으면, 실재 파일도 삭제하기 위해서 
		List<NoticeFile> delFileList = noticeService.modify(n, fileList);
		if(delFileList != null) {
			for(NoticeFile nf : delFileList) {
				File delFile = new File(savepath+nf.getNoticeFilePath());
				delFile.delete();
			}
			return 1;
		}else {
			return 0;
		}
	}
}
