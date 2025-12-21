"""
QueueLess - Seat Availability Detector
Detects people in canteen using phone camera + YOLOv8
"""

import cv2
from ultralytics import YOLO
from flask import Flask, jsonify
from flask_cors import CORS
import threading
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

CAMERA_URL = os.getenv("CAMERA_URL", "http://192.168.1.1:8080/video")
CANTEEN_CAPACITY = int(os.getenv("CANTEEN_CAPACITY", 200))

# Global variable to store current count
current_count = 0
lock = threading.Lock()

# Flask app for API
app = Flask(__name__)
CORS(app)  # Allow React frontend to call this

@app.route("/api/seat-count", methods=["GET"])
def get_seat_count():
    """API endpoint for React frontend"""
    with lock:
        return jsonify({
            "count": current_count,
            "capacity": CANTEEN_CAPACITY,
            "available": CANTEEN_CAPACITY - current_count,
            "occupancy_percent": round((current_count / CANTEEN_CAPACITY) * 100, 1)
        })

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "Camera service running 📷"})


def run_detection():
    """Main detection loop - runs in separate thread"""
    global current_count
    
    print(f"🎥 Connecting to camera: {CAMERA_URL}")
    print(f"🪑 Canteen capacity set to: {CANTEEN_CAPACITY}")
    print("-" * 50)
    
    # Load YOLOv8 model (downloads automatically on first run)
    print("📦 Loading YOLOv8 model...")
    model = YOLO("yolov8n.pt")  # 'n' = nano, fast and light
    print("✅ Model loaded!")
    
    # Connect to phone camera
    cap = cv2.VideoCapture(CAMERA_URL)
    
    if not cap.isOpened():
        print("❌ Failed to connect to camera!")
        print(f"   Make sure IP Webcam is running and URL is correct: {CAMERA_URL}")
        return
    
    print("✅ Camera connected!")
    print("-" * 50)
    print("Press 'q' to quit")
    print("-" * 50)
    
    while True:
        ret, frame = cap.read()
        
        if not ret:
            print("⚠️  Frame capture failed, retrying...")
            continue
        
        # Run YOLOv8 detection
        results = model(frame, verbose=False)
        
        # Count people (class 0 = person in COCO dataset)
        person_count = 0
        
        for result in results:
            boxes = result.boxes
            
            for box in boxes:
                # Check if it's a person (class 0)
                if int(box.cls[0]) == 0:
                    person_count += 1
                    
                    # Get bounding box coordinates
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    confidence = float(box.conf[0])
                    
                    # Draw green box around person
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    
                    # Draw confidence label
                    label = f"Person {confidence:.0%}"
                    cv2.putText(frame, label, (x1, y1 - 10), 
                               cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        
        # Update global count
        with lock:
            current_count = person_count
        
        # Draw info panel at top
        panel_height = 80
        cv2.rectangle(frame, (0, 0), (frame.shape[1], panel_height), (0, 0, 0), -1)
        
        # Title
        cv2.putText(frame, "QueueLess - Seat Detector", (10, 25),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
        
        # Count display
        count_text = f"People Detected: {person_count}"
        cv2.putText(frame, count_text, (10, 55),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
        
        # Capacity display
        capacity_text = f"Seats: {person_count}/{CANTEEN_CAPACITY}"
        occupancy = (person_count / CANTEEN_CAPACITY) * 100
        
        # Color based on occupancy
        if occupancy < 50:
            color = (0, 255, 0)  # Green
        elif occupancy < 80:
            color = (0, 255, 255)  # Yellow
        else:
            color = (0, 0, 255)  # Red
            
        cv2.putText(frame, capacity_text, (frame.shape[1] - 200, 55),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
        
        # Show frame
        cv2.imshow("QueueLess - Seat Availability", frame)
        
        # Press 'q' to quit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()
    print("\n👋 Detection stopped")


def run_flask():
    """Run Flask API server"""
    print("🚀 Starting API server on http://localhost:5001")
    app.run(host="0.0.0.0", port=5001, debug=False, use_reloader=False)


if __name__ == "__main__":
    print("=" * 50)
    print("🪑 QueueLess Seat Availability Detector")
    print("=" * 50)
    
    # Start Flask API in background thread
    flask_thread = threading.Thread(target=run_flask, daemon=True)
    flask_thread.start()
    
    # Run detection in main thread (needs to be main for cv2.imshow)
    run_detection()