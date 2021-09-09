import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
public class coordExtract {

	
	static String finalString;
	static ArrayList<String> seperateCoords = new ArrayList<String>();
	
	
	public static void convertString (String Name,String in) {
		
		 Pattern p = Pattern.compile("\\d+");
	     Matcher m = p.matcher(in);
	     while(m.find()) {
	    	 seperateCoords.add(m.group());
	     }
	     for(int i=0;i<8;i++) {
	    	 seperateCoords.remove(seperateCoords.size()-1);
	     }
	     
		finalString = "";
	     
	     for(int i = 0; i < seperateCoords.size(); i+=4) {
	    	 finalString = finalString + "[" + seperateCoords.get(i+2) + "." + seperateCoords.get(i+3) + "," + seperateCoords.get(i)+ "." + seperateCoords.get(i+1) + "]" + ",";
	     }
		
		System.out.println(",{ \"type\": \"Feature\", \"properties\": {\""+"NAME"+"\":\""+Name+"\"}, \"geometry\": { \"type\": \"MultiPolygon\", \"coordinates\": [ [ ["+finalString.substring(0,finalString.length()-1)+" ] ] ] } },"); ;
	}
	
	public static void main(String[] args) {
		
		convertString("Lotus","\"{\\\"points\\\":[{\\\"lat\\\":30.0271355,\\\"lng\\\":31.498956},{\\\"lat\\\":30.0256911,\\\"lng\\\":31.4985992},{\\\"lat\\\":30.0253939,\\\"lng\\\":31.4987226},{\\\"lat\\\":30.0242931,\\\"lng\\\":31.5015845},{\\\"lat\\\":30.0230855,\\\"lng\\\":31.5043097},{\\\"lat\\\":30.0214599,\\\"lng\\\":31.5075176},{\\\"lat\\\":30.0195927,\\\"lng\\\":31.5108542},{\\\"lat\\\":30.0177626,\\\"lng\\\":31.5138476},{\\\"lat\\\":30.015412,\\\"lng\\\":31.5172539},{\\\"lat\\\":30.013907,\\\"lng\\\":31.5191207},{\\\"lat\\\":30.0127365,\\\"lng\\\":31.5204296},{\\\"lat\\\":30.0120492,\\\"lng\\\":31.5213792},{\\\"lat\\\":30.0117891,\\\"lng\\\":31.5221033},{\\\"lat\\\":30.0120213,\\\"lng\\\":31.5229349},{\\\"lat\\\":30.0136097,\\\"lng\\\":31.5243778},{\\\"lat\\\":30.0160811,\\\"lng\\\":31.5259283},{\\\"lat\\\":30.019091,\\\"lng\\\":31.5273123},{\\\"lat\\\":30.0228904,\\\"lng\\\":31.5283422},{\\\"lat\\\":30.026959,\\\"lng\\\":31.5290074},{\\\"lat\\\":30.0305352,\\\"lng\\\":31.5286641},{\\\"lat\\\":30.0341949,\\\"lng\\\":31.5278058},{\\\"lat\\\":30.0371949,\\\"lng\\\":31.5265291},{\\\"lat\\\":30.0404178,\\\"lng\\\":31.5247052},{\\\"lat\\\":30.0415137,\\\"lng\\\":31.5237825},{\\\"lat\\\":30.0418527,\\\"lng\\\":31.5230288},{\\\"lat\\\":30.041653,\\\"lng\\\":31.522141},{\\\"lat\\\":30.04091,\\\"lng\\\":31.5211968},{\\\"lat\\\":30.0393404,\\\"lng\\\":31.5192013},{\\\"lat\\\":30.037037,\\\"lng\\\":31.5160255},{\\\"lat\\\":30.0347707,\\\"lng\\\":31.5126352},{\\\"lat\\\":30.0333496,\\\"lng\\\":31.5099745},{\\\"lat\\\":30.0321143,\\\"lng\\\":31.5077},{\\\"lat\\\":30.0302937,\\\"lng\\\":31.5033575},{\\\"lat\\\":30.0293254,\\\"lng\\\":31.5003225},{\\\"lat\\\":30.0288168,\\\"lng\\\":31.4987226},{\\\"lat\\\":30.0286032,\\\"lng\\\":31.4985054}],\\\"bounds\\\":{\\\"left\\\":31.4985054,\\\"bottom\\\":30.0117891,\\\"right\\\":31.5290074,\\\"top\\\":30.0418527,\\\"centerLatLng\\\":null}}\"");
		
		//Last 2 pairs in the output are the bounds in the form [left,bottom] , [right,top].
		//I don't know if we need the bounds or not. If not, just don't copy the bounds part from the console and the output should be fine.
		
	}
}
