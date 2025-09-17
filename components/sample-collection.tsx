import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { 
  Camera, 
  MapPin, 
  Calendar, 
  Upload,
  Beaker,
  Navigation,
  Clock,
  FileText
} from "lucide-react";

export function SampleCollection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* New Sample Collection Form */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <Beaker className="w-5 h-5 text-blue-600" />
            Collect New Sample
          </CardTitle>
          <p className="text-sm text-slate-600">Field sample collection interface</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sample-id">Sample ID</Label>
              <Input id="sample-id" value="WS-2024-0916-001" readOnly className="bg-slate-50" />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <Input id="location" placeholder="Enter location..." />
                <Button size="sm" variant="ghost" className="absolute right-1 top-1 h-6">
                  <Navigation className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="coordinates">GPS Coordinates</Label>
              <Input id="coordinates" value="28.6139° N, 77.2090° E" readOnly className="bg-slate-50" />
            </div>
            <div>
              <Label htmlFor="team">Field Team</Label>
              <Input id="team" value="Team Alpha" readOnly className="bg-slate-50" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">Sample Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Environmental conditions, observations, special notes..."
              className="h-20"
            />
          </div>
          
          <div className="space-y-3">
            <Label>Sample Documentation</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Camera className="w-6 h-6 text-blue-600" />
                <span className="text-sm">Take Photo</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Upload className="w-6 h-6 text-blue-600" />
                <span className="text-sm">Upload Files</span>
              </Button>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-200">
            <div className="flex gap-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Beaker className="w-4 h-4 mr-2" />
                Collect Sample
              </Button>
              <Button variant="outline">
                Save Draft
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Samples */}
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-slate-800">Recent Samples</CardTitle>
              <p className="text-sm text-slate-600 mt-1">Latest sample collections</p>
            </div>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-1" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: "WS-2024-0916-001",
                location: "Yamuna River - Delhi",
                time: "15 min ago",
                team: "Team Alpha",
                status: "processing",
                images: 3
              },
              {
                id: "WS-2024-0916-002", 
                location: "Ganges - Kanpur",
                time: "1 hour ago",
                team: "Team Beta",
                status: "completed",
                images: 5
              },
              {
                id: "WS-2024-0916-003",
                location: "Sabarmati - Ahmedabad",
                time: "2 hours ago", 
                team: "Team Gamma",
                status: "analyzing",
                images: 2
              },
              {
                id: "WS-2024-0916-004",
                location: "Narmada - Bhopal",
                time: "3 hours ago",
                team: "Team Delta", 
                status: "completed",
                images: 4
              }
            ].map((sample) => (
              <div
                key={sample.id}
                className="border border-slate-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-slate-900">{sample.id}</h4>
                      <Badge 
                        variant="secondary"
                        className={
                          sample.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' :
                          sample.status === 'processing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          sample.status === 'analyzing' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-slate-50 text-slate-700 border-slate-200'
                        }
                      >
                        {sample.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{sample.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{sample.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                      <span>Team: {sample.team}</span>
                      <span>Images: {sample.images}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              Total samples today: <span className="text-slate-900">12</span> | 
              Pending analysis: <span className="text-slate-900">3</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}