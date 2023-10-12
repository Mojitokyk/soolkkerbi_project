package kr.or.skb.review.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.skb.FileUtil;
import kr.or.skb.review.model.service.ReviewService;
import kr.or.skb.review.model.vo.Review;


@RestController
@RequestMapping(value="/review")
public class ReviewController {
	@Autowired
	private ReviewService reviewService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	//리뷰 등록 에디터 내 이미지 업로드
	@PostMapping(value="/contentImg")
	public String contentImg(@ModelAttribute MultipartFile image) {
		String savepath = root + "review/editor/";
		String filename = image.getOriginalFilename();
		String filepath = fileUtil.getFilepath(savepath, filename, image);
		return "/review/editor/"+filepath;
	}
	
	//리뷰 등록
	@PostMapping(value="/insert")
	public int insertReview(@RequestBody Review r) {
		System.out.println(r);
		return reviewService.insertReview(r);
	}
	
	//리뷰 리스트 조회
	@GetMapping(value="/reviewList/{reqPage}")
	public Map reviewList(@PathVariable int reqPage, @RequestAttribute String memberId) {
		return reviewService.reviewList(reqPage,memberId);
	}
	
}
