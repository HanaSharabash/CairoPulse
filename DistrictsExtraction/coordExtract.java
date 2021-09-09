import java.util.ArrayList;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
public class coordExtract {

	static String finalString;
	static ArrayList<String> seperateCoords = new ArrayList<String>();
	
	//This code is used to convert the resulted text from doing the previous steps(Doing the wikimapia console command)
	//into a geojson object which is copied directly into the districts.geojson file we use.
	public static void convertString (String Name,String in) {
		 // Using regex to get the coordinates.
		 Pattern p = Pattern.compile("\\d+");
	     Matcher m = p.matcher(in);
	     while(m.find()) {
	    	 seperateCoords.add(m.group());
	     }
	     
	     //removing the bounds coordinates as they are not needed
	     for(int i=0;i<8;i++) {
	    	 seperateCoords.remove(seperateCoords.size()-1);
	     }
	     
	     
		finalString = "";
	     
	     for(int i = 0; i < seperateCoords.size(); i+=4) {
	    	 //geojson uses the format [longitude,latitude]
	    	 finalString = finalString + "[" + seperateCoords.get(i+2) + "." + seperateCoords.get(i+3) + "," + seperateCoords.get(i)+ "." + seperateCoords.get(i+1) + "]" + ",";
	     }
		//print the resulted geojson object that should be copied into the districts geojson file
		System.out.println("{ \"type\": \"Feature\", \"properties\": {\""+"NAME"+"\":\""+Name+"\"}, \"geometry\": { \"type\": \"MultiPolygon\", \"coordinates\": [ [ ["+finalString.substring(0,finalString.length()-1)+" ] ] ] } },"); ;
	}
	
	public static void main(String[] args) {
		Scanner sc= new Scanner(System.in);
		System.out.println("Insert the district name:");
		String district=sc.nextLine();
		System.out.println("Insert the coordinates text:");
		String text=sc.nextLine();
		convertString(district,text);
		
	}
}
