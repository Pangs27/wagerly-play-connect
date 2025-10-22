import { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { filterPresets } from '@/data/mockPlayers';
import { FilterPreset } from '@/types/matchmaking';

interface FilterDrawerProps {
  onFiltersChange: (filters: FilterPreset) => void;
}

export function FilterDrawer({ onFiltersChange }: FilterDrawerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterPreset>(filterPresets[0]);

  const applyPreset = (preset: FilterPreset) => {
    setFilters(preset);
    onFiltersChange(preset);
    console.log('Applied preset:', preset.name);
  };

  const updateFilter = (key: keyof FilterPreset, value: any) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const resetToDefault = () => {
    applyPreset(filterPresets[0]);
  };

  const saveCurrentPreset = () => {
    console.log('Saving current preset:', filters);
    // In a real app, would save to user preferences
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors rounded-lg"
      >
        <h2 className="text-lg font-semibold">Filters & Preferences</h2>
        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>

      {isExpanded && (
        <div className="p-4 pt-0 space-y-6 animate-accordion-down">
          {/* Presets */}
          <div>
            <label className="text-sm font-medium mb-2 block">Quick Presets</label>
            <div className="flex gap-2 flex-wrap">
              {filterPresets.map((preset) => (
                <Badge
                  key={preset.name}
                  variant={filters.name === preset.name ? 'default' : 'outline'}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => applyPreset(preset)}
                >
                  {preset.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* MMR Range */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              MMR Range: ±{filters.mmrRange}
            </label>
            <Slider
              value={[filters.mmrRange]}
              onValueChange={([val]) => updateFilter('mmrRange', val)}
              min={50}
              max={500}
              step={25}
              className="w-full"
            />
          </div>

          {/* Max Ping */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Max Ping: {filters.maxPing}ms
            </label>
            <Slider
              value={[filters.maxPing]}
              onValueChange={([val]) => updateFilter('maxPing', val)}
              min={20}
              max={150}
              step={5}
              className="w-full"
            />
          </div>

          {/* Voice Required */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Voice Chat Required</label>
            <Switch
              checked={filters.voiceRequired}
              onCheckedChange={(val) => updateFilter('voiceRequired', val)}
            />
          </div>

          {/* Toxicity Cap */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Toxicity Tolerance: {filters.toxicityCap}%
            </label>
            <Slider
              value={[filters.toxicityCap]}
              onValueChange={([val]) => updateFilter('toxicityCap', val)}
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          {/* Regions */}
          <div>
            <label className="text-sm font-medium mb-2 block">Regions</label>
            <div className="flex gap-2 flex-wrap">
              {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'].map((region) => (
                <Badge
                  key={region}
                  variant={filters.regions.includes(region) ? 'default' : 'outline'}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    const newRegions = filters.regions.includes(region)
                      ? filters.regions.filter((r) => r !== region)
                      : [...filters.regions, region];
                    updateFilter('regions', newRegions);
                  }}
                >
                  {region}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={saveCurrentPreset}
              className="flex-1"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Preset
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetToDefault}
              className="flex-1"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
