package kr.or.skb.product.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

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
import kr.or.skb.member.model.vo.Member;
import kr.or.skb.product.model.service.ProductService;
import kr.or.skb.product.model.vo.Product;

@RestController
@RequestMapping(value="/product")
public class ProductController {
	@Autowired
	private ProductService productService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	//상품 등록
	@PostMapping(value="/insert")
	public int insertBoard(@ModelAttribute Product p, 
							@ModelAttribute MultipartFile thumbnail) {
		String savepath = root+"product/";
		if(thumbnail != null) {
			String filename = thumbnail.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, thumbnail);
			p.setProductFilepath(filepath);
		}
		int result = productService.insertProduct(p);
		return result;
	}
	
	//상품 등록 에디터 내 이미지 업로드
	@PostMapping(value="/contentImg")
	public String contentImg(@ModelAttribute MultipartFile image) {
		String savepath = root+"product/editor/";
		String filename = image.getOriginalFilename();
		String filepath = fileUtil.getFilepath(savepath, filename, image);
		return "/product/editor/"+filepath;
	}
	
	//탁주 리스트 조회
	@PostMapping(value="/takju/{reqPage}")
	public Map takjuList(@PathVariable int reqPage, @RequestAttribute(required=false) String memberId) {
		Map map = productService.takjuList(reqPage, memberId);
		return map;
	}
	
	//약,청주 리스트 조회
	@PostMapping(value="/yakju/{reqPage}")
	public Map yakjuList(@PathVariable int reqPage, @RequestAttribute(required=false) String memberId) {
		Map map = productService.yakjuList(reqPage, memberId);
		return map;
	}
	
	//과실주 리스트 조회
	@PostMapping(value="/fruit/{reqPage}")
	public Map fruitList(@PathVariable int reqPage, @RequestAttribute(required=false) String memberId) {
		Map map = productService.fruitList(reqPage, memberId);
		return map;
	}
	
	//증류주 리스트 조회
	@PostMapping(value="/spirits/{reqPage}")
	public Map spiritsList(@PathVariable int reqPage, @RequestAttribute(required=false) String memberId) {
		Map map = productService.spiritsList(reqPage, memberId);
		return map;
	}
	
	//상품리스트 좋아요
	@PostMapping(value="/like")
	public int insertLike(@RequestBody Product p, @RequestAttribute String memberId) {
		p.setMemberId(memberId);
		return productService.insertLike(p);
	}
	
	//상품리스트 좋아요 취소
	@PostMapping(value="/dislike")
	public int deleteLike(@RequestBody Product p, @RequestAttribute String memberId) {
		p.setMemberId(memberId);
		return productService.deleteLike(p);
	}
	
	@GetMapping(value = "/readAllProduct/{reqPage}")
	public Map readAllProduct(@PathVariable int reqPage) {
		return productService.readAllProduct(reqPage);
	}

	@PostMapping(value = "/updateStock")
	public int updateStock(@RequestBody Product p) {
		return productService.updateStock(p);
	}
	
	//상품 상세보기
	@PostMapping(value="/view")
	public Product selectOneProduct(@RequestBody Product p) {
		return productService.selectOneProduct(p);
	}
	
	//좋아요 리스트 가져오기
	@GetMapping(value="/likeList")
	public List likeList(@RequestAttribute String memberId) {
		return productService.likeList(memberId);
	}
	
	//메인페이지 추천리스트 조회
	@GetMapping(value="/recommendList")
	public List recommendList() {
		List list = productService.recommendList();
		return list;
	}
	//상품 삭제
	@PostMapping(value="/delete")
	public int deleteProduct(@RequestBody Product p) {
		int productNo = p.getProductNo();
		return productService.deleteProduct(productNo);
	}
	
	//상품 수정
	@PostMapping(value="/update")
	public int updateProduct(@ModelAttribute Product p, @ModelAttribute MultipartFile thumbnail) {
		String savepath = root+ "product/";
		if(thumbnail != null) {
			String filename = thumbnail.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, thumbnail);
			p.setProductFilepath(filepath);
		}
		System.out.println(p);
		int result = productService.updateProduct(p);
		return result;
	}
	
}