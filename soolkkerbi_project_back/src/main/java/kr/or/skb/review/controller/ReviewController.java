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
import kr.or.skb.product.model.vo.Product;
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
	
	//상품마다 리뷰 리스트 조회
	@PostMapping(value="/productReviewList/{reqPage}")
	public Map productReviewList(@PathVariable int reqPage,@RequestBody Product product) {
		int productNo = product.getProductNo();
		//System.out.println(productNo);
		return reviewService.productReviewList(reqPage, productNo);
	}
	//상품 리뷰 총 갯수
	@PostMapping(value="/reviewCount")
	public int reviewCount(@RequestBody Product product) {
		int productNo = product.getProductNo();
		return reviewService.reviewCount(productNo);
	}
	
	//리뷰 조회수 올리기
	@PostMapping(value="/updateCount")
	public int updateCount(@RequestBody Review review) {
		int reviewNo = review.getReviewNo();
		return reviewService.updateCount(reviewNo);
	}
	
	@GetMapping(value="/readAllReview/{reqPage}")
	public Map readAllReview(@PathVariable int reqPage) {
		return reviewService.readAllReview(reqPage);
	}
	//리뷰 삭제
	@PostMapping(value="/delete")
	public int delete(@RequestBody Review r) {
		int reviewNo = r.getReviewNo();
		return reviewService.deleteReview(reviewNo);
	}
	
	//리뷰 수정
	@PostMapping(value="/modify")
	public int modify(@RequestBody Review r) {
		System.out.println(r);
		return reviewService.modifyReview(r);
	}
}
